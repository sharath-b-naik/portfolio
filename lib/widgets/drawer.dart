import 'package:flutter/material.dart';

import '../shared/shared.dart';
import 'navigation_bar.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({super.key});
  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: bgColor,
      child: Builder(builder: (context) {
        return SingleChildScrollView(
          child: TopRightTabs(
            alignment: WrapAlignment.center,
            width: double.infinity,
            onTap: () => Navigator.of(context).pop(),
          ),
        );
      }),
    );
  }
}
