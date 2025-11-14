import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { MusicPlayer } from '@/components/MusicPlayer';
import { BottomNav } from '@/components/layout/BottomNav';
import { PageTransition } from '@/components/layout/PageTransition';
import { GlobalContextMenu } from '@/components/GlobalContextMenu';
import { AppProvider } from '@/components/Providers';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'MewTone',
  description: 'A modern music streaming app focused on personalized discovery and seamless listening.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <AppProvider>
              <SidebarProvider>
                <div className="relative flex h-svh w-full flex-col">
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar
                      className="peer hidden md:flex"
                      collapsible="icon"
                    >
                      <SidebarNav />
                    </Sidebar>
                    <div className="relative flex flex-1 flex-col overflow-y-auto">
                      <SidebarInset className="resonating-background">
                        <GlobalContextMenu>
                          <PageTransition>
                            {children}
                          </PageTransition>
                        </GlobalContextMenu>
                      </SidebarInset>
                       {/* Desktop Footer: Positioned inside the main content area */}
                       <div className="hidden md:block sticky bottom-0 z-50">
                          <MusicPlayer />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
                    <div className="flex flex-col">
                      <MusicPlayer />
                      <BottomNav />
                    </div>
                  </div>
                </div>
                <Toaster />
              </SidebarProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
