export default {
  title: "Olive Maxwell - Technical Writing Portfolio",
  description: "Technical writing samples for enterprise software systems and APIs.",
  themeConfig: {
    sidebar: [
      {
        text: 'API Reference Documentation',
        items: [
          { text: 'User Authentication API', link: '/user-authentication-api' }
        ]
      },
      {
        text: 'End-User Operating Manuals',
        items: [
          { text: 'Cloud File Migration Utility', link: '/cloud-migration-manual' }
        ]
      },
      {
        text: 'Software Integration Guides',
        items: [
          { text: 'Procedural Tile Spawner', link: '/' },
          { text: 'HUD & UI Event Integration', link: '/hud-ui-integration' }
        ]
      }
    ]
  }
}
