import { Component } from "react";

// A class component, not a function: getDerivedStateFromError and
// componentDidCatch only exist on classes - there is no hook equivalent
// (as of this React version) for catching errors thrown during a
// descendant's render.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  // Called during the render phase, right after a descendant throws.
  // Its only job is to compute the next state - no side effects here.
  static getDerivedStateFromError(error) {
    return { error };
  }

  // Called after the render phase, safe for side effects like logging.
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      const { fallback } = this.props;
      // fallback can be a plain node, or a function that receives the
      // error (and a reset callback) if the caller wants to show the
      // error's message or offer a "try again" button.
      return typeof fallback === "function"
        ? fallback(this.state.error, () => this.setState({ error: null }))
        : fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
