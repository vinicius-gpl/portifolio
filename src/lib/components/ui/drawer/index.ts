import { Dialog as DrawerPrimitive } from 'bits-ui';

import Root from './drawer.svelte';
import Trigger from './drawer-trigger.svelte';
import Portal from './drawer-portal.svelte';
import Overlay from './drawer-overlay.svelte';
import Content from './drawer-content.svelte';
import Header from './drawer-header.svelte';
import Footer from './drawer-footer.svelte';
import Title from './drawer-title.svelte';
import Description from './drawer-description.svelte';
import Close from './drawer-close.svelte';

export {
	Root,
	Trigger,
	Portal,
	Overlay,
	Content,
	Header,
	Footer,
	Title,
	Description,
	Close,
	//
	Root as Drawer,
	Trigger as DrawerTrigger,
	Portal as DrawerPortal,
	Overlay as DrawerOverlay,
	Content as DrawerContent,
	Header as DrawerHeader,
	Footer as DrawerFooter,
	Title as DrawerTitle,
	Description as DrawerDescription,
	Close as DrawerClose,
	DrawerPrimitive
};
