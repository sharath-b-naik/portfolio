import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../widgets/drawer.dart';
import '../../widgets/navigation_bar.dart';
import '../../widgets/projects_grid.dart';
import '../intro/introduction.dart';

final PageController pageController = PageController();

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const CustomDrawer(),
      body: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned(
            left: 0,
            top: 0,
            child: IgnorePointer(
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: Colors.transparent,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(color: Color(0xFFE91E63), blurRadius: 500, spreadRadius: 100),
                    BoxShadow(color: Color(0xFF6E21F3), blurRadius: 500, spreadRadius: 100),
                  ],
                ),
              ),
            ),
          ),
          Positioned.fill(
            child: Column(
              children: [
                //
                //
                //
                //
                //

                TopNavigationBar(),

                //
                //
                //
                //
                //
                Expanded(
                  flex: 9,
                  child: PageView(
                    clipBehavior: Clip.none,
                    scrollDirection: Axis.vertical,
                    physics: const NeverScrollableScrollPhysics(),
                    controller: pageController,
                    children: [
                      const Introduction(),
                      const ProjectGrid(),
                    ],
                  ),
                )
              ],
            ),
          ),
          Positioned.fill(
            child: IgnorePointer(
              child: Icon(
                CupertinoIcons.wind_snow,
                color: Colors.white10,
                size: 180.h,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
