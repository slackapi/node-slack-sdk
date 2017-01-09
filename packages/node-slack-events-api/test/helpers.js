function completionAggregator(done, totalParts) {
  var completedParts = 0;
  var errorSeen = null;
  return function partiallyComplete(error) {
    if (errorSeen) return;
    if (error) {
      errorSeen = error;
      done(error);
    } else {
      completedParts += 1;
      if (completedParts === totalParts) {
        done();
      }
    }
  };
}

exports.completionAggregator = completionAggregator;
