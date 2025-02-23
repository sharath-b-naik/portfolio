import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:url_launcher/url_launcher.dart';

import '../shared/shared.dart';
import '../model/project_model.dart';

class ProjectStack extends StatelessWidget {
  const ProjectStack({super.key, required this.index});
  final int index;

  @override
  Widget build(BuildContext context) {
    ValueNotifier<bool> hoverd = ValueNotifier<bool>(false);

    return MouseRegion(
      onEnter: (event) => !hoverd.value ? hoverd.value = true : null,
      onExit: (event) => hoverd.value ? hoverd.value = false : null,
      child: ValueListenableBuilder(
        valueListenable: hoverd,
        builder: (context, value, child) {
          return InkWell(
            onTap: () {},
            borderRadius: BorderRadius.circular(30),
            splashColor: Colors.transparent,
            highlightColor: Colors.transparent,
            child: AnimatedContainer(
              duration: Duration(milliseconds: 200),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                border: Border.all(color: Colors.white24, width: 1),
                color: bgColor,
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(30),
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: Padding(
                        padding: const EdgeInsets.all(defaultPadding).copyWith(bottom: 0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          spacing: 10,
                          children: [
                            Align(
                              alignment: Alignment.topCenter,
                              child: Text(
                                projectList[index].name,
                                maxLines: 2,
                                style: Theme.of(context).textTheme.titleLarge!.copyWith(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: ResponsiveValue<double>(
                                        context,
                                        defaultValue: 4,
                                        conditionalValues: [
                                          Condition.equals(name: MOBILE, value: 14),
                                          Condition.equals(name: TABLET, value: 16),
                                          Condition.equals(name: DESKTOP, value: 20),
                                        ],
                                      ).value,
                                    ),
                              ),
                            ),
                            Spacer(),
                            Text(
                              projectList[index].description,
                              style: const TextStyle(color: Colors.grey, height: 1.5),
                              maxLines: ResponsiveValue<int>(
                                context,
                                defaultValue: 4,
                                conditionalValues: [
                                  Condition.equals(name: MOBILE, value: 2),
                                  Condition.equals(name: TABLET, value: 2),
                                  Condition.equals(name: DESKTOP, value: 3),
                                ],
                              ).value,
                              overflow: TextOverflow.ellipsis,
                            ),
                            ProjectLinks(index: index),
                            const SizedBox(height: defaultPadding / 8),
                          ],
                        ),
                      ),
                    ),
                    Positioned(
                      left: 0,
                      top: 0,
                      child: IgnorePointer(
                        child: AnimatedOpacity(
                          opacity: value ? 1 : 0,
                          duration: Duration(milliseconds: 200),
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              color: Colors.transparent,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(color: orangeColor, blurRadius: 500, spreadRadius: 100),
                                BoxShadow(color: yellowColor, blurRadius: 500, spreadRadius: 100),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class ProjectLinks extends StatelessWidget {
  final int index;
  const ProjectLinks({super.key, required this.index});
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton(
          onPressed: () {
            launchUrl(Uri.parse(projectList[index].link));
          },
          icon: SvgPicture.asset(
            'assets/icons/github.svg',
          ),
        ),
        const Spacer(),
        TextButton(
          onPressed: () {
            launchUrl(Uri.parse(projectList[index].link));
          },
          child: const Text(
            'Read More>>',
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: Colors.amber,
              fontWeight: FontWeight.bold,
              fontSize: 10,
            ),
          ),
        )
      ],
    );
  }
}
