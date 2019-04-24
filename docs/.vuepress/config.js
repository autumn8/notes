module.exports = {
    title: 'Pi Cam',
    description: 'Just playing around',
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'External', link: 'https://google.com' },
        ],
        sidebar: [
          {
            title: 'Open CV',
            collapsable: false,
            children: [              
              ['/guide/Install opencv', 'Install on Raspberry PI'],
              ['/guide/python mqtt client', 'MQTT client']
            ]
          },
        ]
    }
 }