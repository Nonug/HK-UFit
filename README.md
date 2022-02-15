#  Comp3330 Group 26 - <img src="app/assets/adaptive-icon.png" alt="drawing" style="width:40px;"/> HKU Fit 

![](demo/poster.jpg)


Cross-platform fitness App for HKU students, created in React Native.

- Chan Tsz Hei, 3035692060
- Chen Xing Sheng, 3035535547
- Chiu Kwun Hung, 3035460302
- Choi Yik Ho, 3035684415
- Ng Wai Chung, 3035484255


## Instruction

Sign-in with Google can works well in a development environment with Expo Go. However, it cannot get response successfully in an Android standalone. Thus, a fake user "Chan Tai Man" is used for the standalone cases. If you want to fully explore the functions provide by HKUFit, follow the instructions below

### Running with Expo

Install Node.js 16.13.0, git

Install Yarn, Expo CLI with node

Add Android Emulator to $PATH

Open a terminal and run
```
$ yarn
$ yarn android
```
Then the app will launched in the emulator

### File directory

Significant files in the project
```
.
├── hkufit_submission           # APK of the Android App
├── App.js                      # Entry of the App
├── app.json                    # Config of the React Native Project
├── package.json                # Node.js Packages
├── yarn.lock                   # Node.js Packages
├── README.md                
└── app                         # source file of the app
    ├── asset                   # Assets
    ├── components              # React Native components
    ├── navigation              # Router
    └── screen                  # View of pages
        ├── Main.js             # Tab navigation of App
        ├── HomeScreen.js       # Home page of the App
        ├── ProgressScreen.js   # Progress function page of the App
        ...
```
### Frontend & Backend Separaion

Access the Home Page of Laravel: https://groupproject26.top
![structure](demo/Solution.png)

## Demo
[![demo video](https://img.youtube.com/vi/VrNuLtlvgms/maxresdefault.jpg))](https://youtu.be/VrNuLtlvgms)
<img src="demo/home.jpg" alt="drawing" style="width:300px;"/>
<img src="demo/booking.jpg" alt="drawing" style="width:300px;"/>
<img src="demo/progress.jpg" alt="drawing" style="width:300px;"/>
<img src="demo/social.jpg" alt="drawing" style="width:300px;"/>
<img src="demo/routine.jpg" alt="drawing" style="width:300px;"/>
