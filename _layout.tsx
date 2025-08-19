import { ConvexAuthProvider } from '@convex-dev/auth/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConvexReactClient } from 'convex/react';


const asyncStorage = {
  getItem: AsyncStorage.getItem,
  setItem: AsyncStorage.setItem,
  removeItem: AsyncStorage.removeItem,
};

const convex = new ConvexReactClient(process.env.CONVEX_URL!, {
  unsavedChangesWarning: false,
});
export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <ConvexAuthProvider client={convex} storage={asyncStorage}>
      {children}
    </ConvexAuthProvider>
  );
}
