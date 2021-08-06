#!/usr/bin/env ruby
#
# prerequisites
#   npm install quicktype

require 'open3'

index_file = __dir__ + '/../packages/web-api/src/response/index.ts'
File.truncate(index_file, 0)

class TsWriter
  def write(root_class_name, json_path, typedef_filepath, input_json)
    # cmd = "npx quicktype --just-types --all-properties-optional --acronym-style original -t #{root_class_name} -l ts -o #{typedef_filepath}"
    cmd = "npx quicktype --just-types --all-properties-optional --acronym-style original -t #{root_class_name} -l ts"
    puts "Generating #{root_class_name} from #{json_path}"
    Open3.popen3(cmd) do |stdin, stdout, stderr, wait_thr|
      stdin.write(input_json)
      stdin.close()
      source = "/* tslint:disable */\nimport { WebAPICallResult } from '../WebClient';\n" + stdout.read
      source.gsub!(
        "export interface #{root_class_name} {", 
        "export type #{root_class_name} = WebAPICallResult & {"
      )
      source.gsub!(/^    /, '  ')
      source.gsub!('"', "'")
      source.sub!(/^}$/, '};')
      File.open(typedef_filepath, 'w') { |f| 
        f.write(source)
      } 
    end
  end

  def append_to_index(root_class_name, index_file)
    File.open(index_file, 'a') do |index_f|
      index_f.puts("export { #{root_class_name} } from './#{root_class_name}';")
    end
  end
end

ts_writer = TsWriter.new

Dir.glob(__dir__ + '/../tmp/java-slack-sdk/json-logs/samples/api/*').sort.each do |json_path|
  File.open(json_path) do |json_file|
    root_class_name = ''
    prev_c = nil
    filename = json_path.split('/').last.gsub(/\.json$/, '')
    filename.split('').each do |c|
      if prev_c.nil? || prev_c == '.'
        root_class_name << c.upcase
      elsif c == '.'
        # noop
      else
        root_class_name << c
      end
      prev_c = c
    end
    if root_class_name.start_with? 'Openid'
      root_class_name.sub!('Openid', 'OpenID')
    end

    root_class_name << 'Response'
    typedef_filepath = __dir__ + "/../packages/web-api/src/response/#{root_class_name}.ts"
    input_json = json_file.read
    ts_writer.write(root_class_name, json_path, typedef_filepath, input_json)
    ts_writer.append_to_index(root_class_name, index_file)
  end
end

