// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:sizer/sizer.dart';

import '../shared/shared.dart';
import '../../../widgets/title_text.dart';
import '../view/home/home.dart';

// ignore: constant_identifier_names
enum TopNavigationBarTab { Home, Projects }

final topTabProvider = StateProvider<TopNavigationBarTab>((ref) => TopNavigationBarTab.Home);

class TopNavigationBar extends StatelessWidget {
  const TopNavigationBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Ink(
      color: Colors.transparent,
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          Image.asset(
            'assets/images/triange_icon.png',
            height: 64.px,
            width: 64.px,
          ),
          SizedBox(width: 60),
          Consumer(
            builder: (_, WidgetRef ref, __) {
              final selectedTab = ref.watch(topTabProvider);

              if (selectedTab == TopNavigationBarTab.Projects) {
                return TabTitleText(
                  key: ValueKey(selectedTab.name),
                  prefix: "Latest",
                  title: "Projects",
                );
              } else {
                return TabTitleText(
                  key: ValueKey(selectedTab.name),
                  prefix: "Welcome",
                  title: "Back",
                );
              }
            },
          ),
          Expanded(
            child: Align(
              alignment: Alignment.centerRight,
              child: Builder(builder: (context) {
                if (ResponsiveBreakpoints.of(context).isDesktop) {
                  return TopRightTabs(alignment: WrapAlignment.end);
                } else {
                  return IconButton(
                    icon: Icon(
                      Icons.menu_rounded,
                      color: Colors.white,
                      size: 40.px,
                    ),
                    onPressed: () {
                      Scaffold.of(context).openDrawer();
                    },
                  );
                }
              }),
            ),
          )
        ],
      ),
    );
  }
}

class TopRightTabs extends StatelessWidget {
  final WrapAlignment alignment;
  final double? width;
  final VoidCallback? onTap;
  const TopRightTabs({
    super.key,
    required this.alignment,
    this.width,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer(
      builder: (_, WidgetRef ref, __) {
        final selectedTab = ref.watch(topTabProvider);

        return Wrap(
          alignment: alignment,
          children: [
            ...TopNavigationBarTab.values.map(
              (tab) {
                return InkWell(
                  onTap: () {
                    ref.read(topTabProvider.notifier).update((state) => state = tab);
                    pageController.animateToPage(
                      tab.index,
                      duration: const Duration(milliseconds: 500),
                      curve: Curves.easeIn,
                    );
                    onTap?.call();
                  },
                  child: SizedBox(
                    width: width,
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: selectedTab == tab ? orangeColor : Colors.transparent,
                            width: 4,
                          ),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Text(
                          tab.name,
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.titleMedium!.copyWith(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        );
      },
    );
  }
}
