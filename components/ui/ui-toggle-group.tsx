import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';
import { UIText } from './ui-text';
import { UIView } from './ui-view';

type ToggleOption<T extends string> = {
  disabled?: boolean;
  label: string;
  value: T;
};

type Props<T extends string> = {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
};

export function UIToggleGroup<T extends string>({
  options,
  value,
  onChange,
  style,
  compact = false,
}: Props<T>) {
  const { colors } = useTheme();

  return (
    <UIView
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceMuted,
          borderColor: colors.border,
        },
        compact ? styles.containerCompact : null,
        style,
      ]}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        const isDisabled = option.disabled === true;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected, disabled: isDisabled }}
            disabled={isDisabled}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: isSelected ? colors.primary : 'transparent',
                borderColor: isSelected ? colors.primary : 'transparent',
                opacity: isDisabled ? 0.45 : pressed ? 0.9 : 1,
              },
              compact ? styles.optionCompact : null,
            ]}
          >
            <UIText
              variant="button"
              color={isSelected ? 'white' : 'default'}
              style={styles.optionText}
            >
              {option.label}
            </UIText>
          </Pressable>
        );
      })}
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 6,
  },
  option: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  optionText: {
    textAlign: 'center',
  },
  containerCompact: {
    borderRadius: 12,
    gap: 6,
    minWidth: 220,
    padding: 4,
  },
  optionCompact: {
    borderRadius: 8,
    minHeight: 34,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
