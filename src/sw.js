console.log('ffff');
// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate" , async (e)=>{
          // eslint-disable-next-line no-restricted-globals
          const subscription = await self.registration.pushManager.subscribe();
          console.log(subscription);
          })
          