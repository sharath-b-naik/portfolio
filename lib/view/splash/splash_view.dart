import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../shared/shared.dart';
import '../../widgets/animated_avatar_container.dart';
import '../home/home.dart';

class SplashView extends StatelessWidget {
  const SplashView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Hero(
                tag: "flutter-logo-animation",
                child: AnimatedAvatarContainer(width: 200, height: 200),
              ),
              SizedBox(height: 50.px),
              Text(
                "Made by Flutter",
                style: Theme.of(context).textTheme.titleLarge!.copyWith(color: Colors.white),
              ),
              SizedBox(height: 50.px),
              TweenAnimationBuilder(
                duration: Duration(seconds: 2),
                onEnd: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const HomePage(),
                    ),
                  );
                },
                builder: (context, value, child) => Stack(
                  children: [
                    Center(
                      child: SizedBox(
                        width: 250.px,
                        height: 10.px,
                        child: LinearProgressIndicator(
                          backgroundColor: Colors.black,
                          color: Colors.deepPurpleAccent,
                          value: value,
                          borderRadius: BorderRadius.circular(30),
                        ),
                      ),
                    ),
                    Center(child: SizedBox()),
                  ],
                ),
                tween: Tween(begin: 0.0, end: 1.0),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
