declare const Finity: {
  configure(): StateMachineConfigurator<string, string>;
  configure<S, E>(): StateMachineConfigurator<S, E>;
  start<S, E>(config: Configuration<S, E>): StateMachine<S, E>;
};

export default Finity;

export interface BaseConfigurator<S, E> {
  getConfig(): Configuration<S, E>;
}

export interface StateMachineConfigurator<S, E> extends BaseConfigurator<S, E> {
  global(): GlobalConfigurator<S, E>;
  initialState(state: S): StateConfigurator<S, E>;
  state(state: S): StateConfigurator<S, E>;
  start(): StateMachine<S, E>;
}

export type StateHook<S, E> = (state: S, context: Context<S, E>) => void;
export type TransitionHook<S, E> = (fromState: S, toState: S, context: Context<S, E>) => void;
export type UnhandledEventHook<S, E> = (event: E, state: S, context: Context<S, E>) => void;

export interface GlobalConfigurator<S, E> extends BaseConfigurator<S, E>, StateMachineConfigurator<S, E> {
  onStateEnter(hook: StateHook<S, E>): GlobalConfigurator<S, E>;
  onStateExit(hook: StateHook<S, E>): GlobalConfigurator<S, E>;
  onTransition(hook: TransitionHook<S, E>): GlobalConfigurator<S, E>;
  onStateChange(hook: TransitionHook<S, E>): GlobalConfigurator<S, E>;
  onUnhandledEvent(hook: UnhandledEventHook<S, E>): GlobalConfigurator<S, E>;
}

export type StateAction<S, E> = (state: S, context: Context<S, E>) => void;

export type AsyncOperation<S, E> = (state: S, context: Context<S, E>) => Promise<any>;

export interface StateConfigurator<S, E> extends BaseConfigurator<S, E>, StateMachineConfigurator<S, E> {
  onEnter(action: StateAction<S, E>): StateConfigurator<S, E>;
  onExit(action: StateAction<S, E>): StateConfigurator<S, E>;
  on(event: E): TriggerConfigurator<S, E>;
  onAny(): TriggerConfigurator<S, E>;
  onTimeout(timeout: number): TimerConfigurator<S, E>;
  do(asyncOperation: AsyncOperation<S, E>): AsyncConfigurator<S, E>;
  submachine<S2>(submachineConfig: Configuration<S2, E>): StateConfigurator<S, E>;
}

export interface TriggerConfigurator<S, E> extends BaseConfigurator<S, E> {
  transitionTo(targetState: S): TransitionConfigurator<S, E>;
  selfTransition(): TransitionConfigurator<S, E>;
  internalTransition(): TransitionConfigurator<S, E>;
  ignore(): TransitionConfigurator<S, E>;
}

export interface TimerConfigurator<S, E> extends TriggerConfigurator<S, E> {
}

export interface AsyncConfigurator<S, E> extends BaseConfigurator<S, E> {
  onSuccess(): TriggerConfigurator<S, E>;
  onFailure(): TriggerConfigurator<S, E>;
}

export type TransitionAction<S, E> = (fromState: S, toState: S, context: Context<S, E>) => void;
export type Condition<S, E> = (context: Context<S, E>) => boolean;

export interface TransitionConfigurator<S, E>
  extends BaseConfigurator<S, E>, StateConfigurator<S, E>, TriggerConfigurator<S, E>, AsyncConfigurator<S, E> {
  withAction(action: TransitionAction<S, E>): TransitionConfigurator<S, E>;
  withCondition(condition: Condition<S, E>): TransitionConfigurator<S, E>;
}

export interface Configuration<S, E> {
}

export interface StateMachine<S, E> {
  getCurrentState(): S;
  getStateHierarchy(): S[];
  canHandle(event: E, eventPayload?: any): boolean;
  handle(event: E, eventPayload?: any): StateMachine<S, E>;
}

export interface Context<S, E> {
  stateMachine: StateMachine<S, E>;
  event?: E;
  eventPayload?: any;
  result?: any;
  error?: Error;
}
