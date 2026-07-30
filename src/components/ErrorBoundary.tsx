import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  /** Shown in logs so a failure can be traced to a specific area. */
  componentName: string;
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Per-section error boundary.
 *
 * Wrap independent blocks so one failing section degrades instead of taking the
 * whole page down.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[${this.props.componentName}]`, error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
