<script setup lang="ts">
  import { Avatar, AvatarImage } from '@/components/ui/avatar'

  import { Button } from '@/components/ui/button'
  import { Moon, Sun } from 'lucide-vue-next'
  import { useRouter } from 'vue-router'

  import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    SidebarFooter,
  } from '@/components/ui/sidebar'
  import { isDark, toggleDark } from '@/lib/utils'
  import { Bot, SquareTerminal } from 'lucide-vue-next'
  import gear from './icon/gear.vue'
  import qinyi from '@/assets/qinyi.jpg'

  const router = useRouter()

  const data = {
    user: {
      name: '沁伊',
      email: '1374714456@qq.com',
      avatar: qinyi,
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
        <SidebarHeader class="px-0">
          <SidebarMenuButton as-child>
            <div>
              <component :is="data.title.logo" />
              <span class="text-lg font-semibold text-sidebar-foreground">{{ data.title.name }}</span>
            </div>
          </SidebarMenuButton>
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
        <SidebarFooter class="px-0">
          <SidebarMenuButton as-child >
            <div>
              <Avatar size="sm" class="w-8 h-8">
                <AvatarImage :src="data.user.avatar" alt="{data.user.name}"  />
              </Avatar>
              <span class="text-sm font-semibold text-sidebar-foreground">{{ data.user.name }}</span>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header
          class="flex h-12 shrink-0 items-center justify-between px-4 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div class="flex items-center gap-2">
            <SidebarTrigger />
            <h1 class="text-lg font-semibold">
              {{ router.currentRoute.value.meta.title }}
            </h1>
          </div>
          <Button @click="toggleDark" variant="outline" size="icon">
            <Sun v-if="!isDark" />
            <Moon v-else />
          </Button>
        </header>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>