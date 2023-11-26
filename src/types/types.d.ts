import 'styled-components';
import { ThemeType } from 'src/theme/theme';

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}
