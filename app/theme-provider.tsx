'use client';
import {ThemeProvider} from 'next-themes';
export default function AppearanceProvider({children}:{children:React.ReactNode}){
 return <ThemeProvider attribute="data-theme" themes={['light','dark','ocean','sage','royal']} defaultTheme="light" enableSystem={false} enableColorScheme={false} storageKey="sanctuary-theme" disableTransitionOnChange>{children}</ThemeProvider>;
}
