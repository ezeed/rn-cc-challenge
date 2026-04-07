import { Feather } from '@expo/vector-icons';
import { ComponentProps, useRef, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';
import { UIView } from './ui-view';

type UIInputIconName = ComponentProps<typeof Feather>['name'];

type Props = TextInputProps & {
  icon?: UIInputIconName;
  clearable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function UIInput({
  clearable = false,
  defaultValue,
  icon,
  containerStyle,
  inputStyle,
  onBlur,
  onChangeText,
  onFocus,
  placeholderTextColor,
  selectionColor,
  style,
  value,
  ...props
}: Props) {
  const { colors, typography } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const currentValue = typeof value === 'string' ? value : internalValue;
  const showClearButton = clearable && currentValue.length > 0;

  const borderColor = isFocused ? colors.primary : colors.border;
  const iconColor = isFocused ? colors.primary : colors.textMuted;

  return (
    <UIView
      style={[
        styles.container,
        {
          borderColor,
        },
        containerStyle,
      ]}
    >
      {icon ? <Feather name={icon} size={18} color={iconColor} /> : null}
      <TextInput
        {...props}
        ref={inputRef}
        defaultValue={defaultValue}
        placeholderTextColor={placeholderTextColor ?? colors.textMuted}
        selectionColor={selectionColor ?? colors.primary}
        value={value}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onChangeText={(nextValue) => {
          if (typeof value !== 'string') {
            setInternalValue(nextValue);
          }
          onChangeText?.(nextValue);
        }}
        style={[
          styles.input,
          {
            color: colors.text,
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.regular,
          },
          style,
          inputStyle,
        ]}
      />
      {showClearButton ? (
        <Pressable
          accessibilityLabel="Clear input"
          hitSlop={8}
          onPress={() => {
            if (typeof value !== 'string') {
              inputRef.current?.clear();
              setInternalValue('');
            }
            onChangeText?.('');
          }}
          style={({ pressed }) => [styles.clearButton, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Feather name="x-circle" size={18} color={iconColor} />
        </Pressable>
      ) : null}
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
});
