import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/catalog';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 text-on-surface">
          <div className="w-full max-w-lg bg-surface border border-status-danger/40 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-status-danger/20 text-status-danger flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">warning</span>
            </div>
            <span className="font-caption text-caption uppercase tracking-widest text-status-danger font-semibold font-mono">
              RUNTIME RECOVERY INTERCEPT
            </span>
            <h2 className="font-headline-md text-headline-md text-text-primary font-bold mt-2">
              Application State Interrupted
            </h2>
            <p className="font-body-md text-body-md text-text-muted mt-2 mb-4 leading-relaxed">
              A temporary runtime condition was captured. The UI state buffer has been preserved.
            </p>

            {this.state.error && (
              <div className="bg-surface-container-lowest p-3 rounded-lg font-mono text-[11px] text-text-muted text-left mb-6 overflow-x-auto border border-border/40">
                {String(this.state.error.message || this.state.error)}
              </div>
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-6 py-2.5 rounded-lg hover:bg-secondary-fixed transition-colors shadow"
              >
                Restore Storefront
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-surface-raised text-text-primary font-label-md text-label-md px-6 py-2.5 rounded-lg hover:bg-surface-container transition-colors border border-border/40"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
