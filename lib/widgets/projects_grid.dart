import 'package:flutter/material.dart';
import 'package:responsive_framework/responsive_framework.dart';

import '../shared/shared.dart';
import '../model/project_model.dart';
import 'project_info.dart';

class ProjectGrid extends StatelessWidget {
  const ProjectGrid({super.key});

  @override
  Widget build(BuildContext context) {
    return ResponsiveGridView.builder(
      itemCount: projectList.length,
      padding: const EdgeInsets.all(defaultPadding),
      gridDelegate: ResponsiveGridDelegate(
        crossAxisSpacing: 25,
        mainAxisSpacing: 25,
        maxCrossAxisExtent: ResponsiveValue<double>(
          context,
          defaultValue: 400,
          conditionalValues: [
            Condition.equals(name: MOBILE, value: 250),
            Condition.equals(name: TABLET, value: 300),
            Condition.equals(name: DESKTOP, value: 400),
          ],
        ).value,
      ),
      itemBuilder: (context, index) {
        return ProjectStack(index: index);
      },
    );
  }
}
