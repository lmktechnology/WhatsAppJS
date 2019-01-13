# WhatsAppJS

WhatsAppJS is a Javascript (Written in TypeScript) wrapper to send WhatsApp messages using code.

# Motivation

  - Too much free time
  - Fun little project to practice TS and Puppeeter
  - Can actually be usefull

### Installation

Its not ready to be used has a npm dependency (yet) but you can download the code, copy the **src**, and import the WhatsAppJS class module to work with it. You also need to include puppeeter has a dependency in your project.

---
# IMPORTANTE NOTICE
## Regarding the safety of your data
As a responsable person you should not trust blindly anything you come accross online. This project is open source so anyone can audit its code and check there is no outside connection or data dumps being made to any untrusted server. You can and **should check the code** which is using a Puppeeter instance and that its actions are confined to the WhatsApp Web app. You can also double check by running this package over a dummy WhatsApp account and spoofing all network calls being made. **They should match all the calls WhatsApp Web App uses in their page and not one more.**

At no moment should you trust a project like this without auditing its code. A puppeetter instance is an actual browser with access to all the data on the WhatsApp account, the same data you would have access if you loggin right now in your local browser.

## **Do not ever read a QRCode which generation you do not know off, do not controll nor understand**

## Regarding the safety of other people data
Also as responsable person and developer, the use of the code in this repository is your and only your responsability. The intend of this project is to automate some task that involve sending WhatsApp message automatically. In no case, the author is reponsable for your intentions, implementations or any damage that might outcome from the use of the code, including WhatsApp terminating your account for any violation of their TOS.

---
## Implemented Features

The first version of WhatsAppJS is capable of:
- Retrieve the QRCode generated in by the WhatsApp web app and retrieve it so the user can login. The QRCode is saved, as image, to disk and can be use to sent/process further.
- Detect user login
- Send automated messages providing a target and a message. (a target, as of now, is confined to one of the active converstions that appear on the left side list.)

## Roadmap

Working-in-process features include:
- Detect received messages, retrieving the sender and the message content to be worked upon.
- Improve how to identify a working target.
   - Ability to search on contacts and not only on the left side contact list.
   - Better algorithm to match the target string to the desire contact.
- Prevent and/or recover from conversations poping in to the active conversation.
- Use of whatsapp api instead of DOM manipulation.
- Make getQrCode() method also retrieve the Base64 string if the developer decides to do something else with it.

---
## The WhatsAppJS class

The class provides a way to generate the login QRCode which is saved to a image file and/or launched on screen. Reading the QRCode within an WhatsApp phone app, logs that user into the active puppeeter instance.
After a valid login is detected, the WhatsAppJS class provides methods to send messages.

#### WhatsAppJS.initiate(options)
```
Kicks in the puppeeter instance.
This is not included on the class constructor because it is resource intensive. With a initiate method, you can control when the class does the heavy lifting.
```
#### WhatsAppJS.getQrCode({openFile})
```
Get the QRCode for the user to log in into.
The QRCode is saved to a image file.
You can also decide to show the QRCode on screen by setting openFile to true
```
#### WhatsAppJS.onLogin(callback)
```
The callback that is executed when a valid login is detected.
Its where your send messages logic should reside to make sure they only trigger on a valid user session
```
#### WhatsAppJS.onMessage(callback) [WIP]
```
This feature is not available yet.
The callback to respond to received messages. It is your function which receives a Message object to respond according to the sender (message.target) and the message (message.message). 
```
#### WhatsAppJS.sendMessage({target, message})
```
A message to be sent to a target.
The target is the exact name (for now, see Roadmap) of the conversation that apears on the left side conversations panel of the logged user WhatsApp account. For now targets are limited to the user active conversations and not to the users contact list.
```
#### WhatsAppJS.stop()
```
Kills the WhatsApp listeners and closes the puppeeter instance.
You need to .stop() your WhatsApp object if you want the runtime to end the process, otherwise the listerners might still be active.
```

---
## And working example
```
import WhatsAppJs from './WhatsAppJs'

// Initiate your WhatsAppJs object.
// You can set headless and devTools options.
const WAJS = new WhatsAppJs({
    headless: false,
    devTools: false
})

// Containning the code on a function so you can use async/await
const run = async () => {
    
    // The onLogin setter is the most important because it defines what to do
    // after a valid login is detected.
    // Remember we have to wait for the target user to read the QRCode
    WAJS.onLogin(async () => {
        // Here, we are now logged in and able to send messages
        await WAJS.sendMessage({ target: 'Jon Doe', message: 'Hey, this was a bot!!!' })
        await WAJS.sendMessage({ target: 'Baby', message: 'Still mad with me? :(' })
        await WAJS.sendMessage({ target: 'Mon', message: 'I need more money mon!!!' })
        await WAJS.sendMessage({ target: 'Boss', message: 'Still stuck on traffic, gona be late again :/' })

        // You need to stop the class to kill puppeeter and end the process.
        // Otherwise, Node keeps running. Place it accordingly in your code.
        WAJS.stop()
    })

    // We can also set what to do when a message is received:
    // TODO: this is not working yet 
    WAJS.onMessage((message) => {
        if (message.target === 'Client') {
            await WAJS.sendMessage({ target: 'Client', message: 'I am on a call right now. I will reach you later.})
        }
    })

    // Wait for puppeteer to kick in.
    // This is contained on a initiate method so you can control when to kick in
    // since launching puppeeter can take a while.
    await WAJS.initiate()
    // You can fetch the image file from ./src/temp/qrcode.png after .getQrCode is resolved
    await WAJS.getQrCode({ openImage: true })

    // After getting the QRCode the user must read it with their phone.
    // When a successful login is detected, the callback on onLogin, kicks in.
}

run()
```

---
### Contributions
This project its still in its early stages.
I have not defined a workable contribution model but you are free to open issues regarding request/imporvements.
Follow to receive updates for the road map features.

