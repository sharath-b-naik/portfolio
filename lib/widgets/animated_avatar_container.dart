import 'dart:math';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../shared/shared.dart';

class AnimatedAvatarContainer extends StatefulWidget {
  const AnimatedAvatarContainer({super.key, this.height = 300, this.width = 250});
  final double width;
  final double height;

  @override
  State<AnimatedAvatarContainer> createState() => _AnimatedAvatarContainerState();
}

class _AnimatedAvatarContainerState extends State<AnimatedAvatarContainer> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 2));
    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
    _controller.repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return ShaderMask(
          shaderCallback: (bounds) => gradientColor.createShader(bounds),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Transform.rotate(
                angle: pi * _animation.value,
                child: Container(
                  height: widget.height.px + 50,
                  width: widget.width.px + 50,
                  decoration: BoxDecoration(
                    color: orangeColor,
                    borderRadius: BorderRadius.circular(100),
                  ),
                ),
              ),
              Container(
                height: widget.height.px,
                width: widget.width.px,
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  // gradient: gradientColor,
                  // boxShadow: boxShadow,
                ),
                child: ClipOval(
                  child: Image.asset(
                    'assets/images/image.png',
                    height: 200.px,
                    width: 200.px,
                    fit: BoxFit.cover,
                  ),
                ),
              )
            ],
          ),
        );
      },
    );
  }
}
