import { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { monitoring } from '@/lib/monitoring/monitoring';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    monitoring.captureException(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <DefaultErrorFallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <UIView background="background" style={styles.container}>
      <UIText variant="title" textAlign="center" style={styles.title}>
        Ocurrio un error inesperado
      </UIText>
      <UIText color="muted" textAlign="center" style={styles.message}>
        Por favor, vuelve a intentar mas tarde.
      </UIText>
      <UIPressable variant="primary" onPress={onRetry} text="Reintentar" />
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  message: {
    marginBottom: 24,
  },
});
