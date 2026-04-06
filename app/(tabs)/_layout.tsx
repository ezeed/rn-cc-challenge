import { Platform } from 'react-native';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/lib/theme/theme-provider';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <NativeTabs
      tintColor={colors.primary}
      iconColor={{ default: colors.tabIcon, selected: colors.primary }}
      labelStyle={{
        default: { color: colors.tabIcon },
        selected: { color: colors.primary },
      }}
      backgroundColor={colors.tabBar}
      shadowColor={colors.border}
      disableIndicator={Platform.OS === 'android'}
      rippleColor="transparent"
      disableTransparentOnScrollEdge
      screenListeners={{
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }}
          md="analytics"
        />
        <NativeTabs.Trigger.Label selectedStyle={{ color: colors.primary }}>
          Instrumentos
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="portfolio">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'briefcase', selected: 'briefcase.fill' }}
          md="business_center"
        />
        <NativeTabs.Trigger.Label selectedStyle={{ color: colors.primary }}>
          Portfolio
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
          md="settings"
        />
        <NativeTabs.Trigger.Label selectedStyle={{ color: colors.primary }}>
          Configuración
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
