import React from 'react';
import { ErrorStatePage } from './ErrorStatePage';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  referenceId: string;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      referenceId: '',
    };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    const refId = `KX-500-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      hasError: true,
      errorMessage: error?.message || 'Unexpected runtime failure',
      referenceId: refId,
    };
  }

  componentDidCatch(error: Error) {
    if (typeof document !== 'undefined') {
      document.title = '500 — Application Error | Kexora';
      let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
      }
      robots.content = 'noindex, follow';
    }
    console.error('Kexora Runtime ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-zinc-950 flex flex-col">
          <header className="border-b border-zinc-200 px-6 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <a
                href="/"
                className="kexora-logo-font text-xl font-bold tracking-wider text-zinc-950"
              >
                Kexora
              </a>
              <a
                href="mailto:support@kexora.in"
                className="text-xs font-semibold text-zinc-600 hover:text-zinc-950"
              >
                support@kexora.in
              </a>
            </div>
          </header>
          <main className="flex-1">
            <ErrorStatePage
              kind={500}
              errorMessage={this.state.errorMessage}
              errorReferenceId={this.state.referenceId}
              onRetry={() => window.location.reload()}
            />
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
