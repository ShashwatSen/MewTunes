
# MewTone Project Structure

This document outlines the file structure of the MewTone application.

```
.
├── .env
├── README.md
├── apphosting.yaml
├── components.json
├── next.config.ts
├── package.json
├── structure.md
├── tailwind.config.ts
├── tsconfig.json
└── src
    ├── ai
    │   ├── dev.ts
    │   ├── genkit.ts
    │   └── flows
    │       ├── ai-powered-music-discovery.ts
    │       └── personalized-song-recommendations.ts
    ├── app
    │   ├── blend
    │   │   └── page.tsx
    │   ├── discover
    │   │   └── page.tsx
    │   ├── login
    │   │   └── page.tsx
    │   ├── playlists
    │   │   ├── [id]
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── settings
    │   │   └── page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── layout
    │   │   ├── BottomNav.tsx
    │   │   ├── PageTransition.tsx
    │   │   └── SidebarNav.tsx
    │   ├── ui
    │   │   ├── accordion.tsx
    │   │   ├── alert.tsx
    │   │   ├── alert-dialog.tsx
    │   │   ├── avatar.tsx
    │   │   ├── badge.tsx
    │   │   ├── button.tsx
    │   │   ├── calendar.tsx
    │   │   ├── card.tsx
    │   │   ├── carousel.tsx
    │   │   ├── chart.tsx
    │   │   ├── checkbox.tsx
    │   │   ├── collapsible.tsx
    │   │   ├── context-menu.tsx
    │   │   ├── dialog.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── form.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── menubar.tsx
    │   │   ├── popover.tsx
    │   │   ├── progress.tsx
    │   │   ├── radio-group.tsx
    │   │   ├── scroll-area.tsx
    │   │   ├── select.tsx
    │   │   ├── separator.tsx
    │   │   ├── sheet.tsx
    │   │   ├── sidebar.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── slider.tsx
    │   │   ├── switch.tsx
    │   │   ├── table.tsx
    │   │   ├── tabs.tsx
    │   │   ├── textarea.tsx
    │   │   ├── toast.tsx
    │   │   ├── toaster.tsx
    │   │   ├── tooltip.tsx
    │   │   └── typewriter-effect.tsx
    │   ├── GlobalContextMenu.tsx
    │   ├── LoadingScreen.tsx
    │   ├── Logo.tsx
    │   ├── MusicPlayer.tsx
    │   ├── SearchDialog.tsx
    │   ├── SongList.tsx
    │   ├── ThemeToggle.tsx
    │   ├── providers.tsx
    │   └── theme-provider.tsx
    ├── hooks
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    └── lib
        ├── fetchers
        │   ├── index.ts
        │   ├── jamendo.ts
        │   ├── soundcloud.ts
        │   ├── theaudiodb.ts
        │   └── youtube.ts
        ├── data.ts
        ├── music-api.ts
        ├── types.ts
        └── utils.ts
```
