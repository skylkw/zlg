<script setup lang="ts">
  // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
  // import {
  //   DropdownMenu,
  //   DropdownMenuContent,
  //   DropdownMenuGroup,
  //   DropdownMenuItem,
  //   DropdownMenuSeparator,
  //   DropdownMenuTrigger,
  // } from '@/components/ui/dropdown-menu'
  import { useRouter } from 'vue-router'

  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
  } from '@/components/ui/sidebar'
  import { Bot, SquareTerminal } from 'lucide-vue-next'

  import gear from './icon/gear.vue'

  const router = useRouter()

  // This is sample data.
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    title: {
      name: '株齿电机控制上位机',
      logo: gear,
    },

    navMain: [
      {
        name: 'Zlg',
        url: '/zlg',
        icon: SquareTerminal,
      },
      {
        name: '双电机控制',
        url: '/motor',
        icon: Bot,
      },
    ],
  }
</script>

<template>
  <div>
    <SidebarProvider>
      <Sidebar collapsible="icon" class="w-60">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" as-child class="p-0">
                <div>
                  <component :is="data.title.logo" />
                  <span class="text-lg font-semibold text-sidebar-foreground">{{ data.title.name }}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in data.navMain" :key="item.name">
              <SidebarMenuButton as-child>
                <RouterLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <!-- <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <SidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                      <AvatarFallback class="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ data.user.name }}</span>
                      <span class="truncate text-xs">{{ data.user.email }}</span>
                    </div>
                    <ChevronsUpDown class="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  :side-offset="4">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter> -->
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div class="flex w-full items-center gap-2 px-4">
            <SidebarTrigger />
            <h1 class="text-lg font-semibold">
              {{ router.currentRoute.value.meta.title }}
            </h1>
          </div>
        </header>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" class="px-4" />
          </KeepAlive>
        </RouterView>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>