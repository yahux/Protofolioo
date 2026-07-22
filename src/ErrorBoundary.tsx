import React from 'react';

interface State {
  error: Error | null;
  info: string | null;
}

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null, info: null };

  static getDerivedStateFromError(error: Error) {
    return { error, info: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
    this.setState({ info: info.componentStack || null });
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0b',
            color: '#e5e7eb',
            fontFamily: 'monospace',
            fontSize: 12,
            padding: 20,
            overflow: 'auto',
            zIndex: 999999,
            whiteSpace: 'pre-wrap',
          }}
        >
          <h1 style={{ color: '#f87171', fontSize: 16, marginBottom: 12 }}>
            Something crashed while rendering the page
          </h1>
          <p style={{ marginBottom: 8 }}>{this.state.error.message}</p>
          <pre style={{ opacity: 0.7 }}>{this.state.error.stack}</pre>
          {this.state.info && (
            <>
              <h2 style={{ marginTop: 16, fontSize: 13 }}>Component stack</h2>
              <pre style={{ opacity: 0.7 }}>{this.state.info}</pre>
            </>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
