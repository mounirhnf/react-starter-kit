import React from 'react';

import Feedback from 'elements/structures/feedback';

//------------------------------------------------------------------------------

export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  };

  render() {
    if (this.state.hasError) {
      return <Feedback type={500} />;
    }

    return this.props.children;
  }
}

//------------------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
};

interface State {
  hasError: boolean;
};
