import AuthLayout from './_auth/AuthLayout';
import SignIn from './_auth/forms/SignIn';
import SignUp from './_auth/forms/SignUp';
import RootLayout from './_root/RootLayout';
import Home from './_root/pages/Home';
import './globals.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Explore from './_root/pages/Explore';
import People from './_root/pages/People';
import Saved from './_root/pages/Saved';
import CreatePost from './_root/pages/CreatePost';
import Profile from './_root/pages/Profile';
import UpdatePost from './_root/pages/UpdatePost';
import PostDetail from './_root/pages/PostDetail';
const App = () => {
  return (
    <main className='flex'>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path='/sign-in'
            element={<SignIn />}
          />
          <Route
            path='/sign-up'
            element={<SignUp />}
          />
        </Route>
        <Route element={<RootLayout />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path='/explore'
            element={<Explore />}
          />
          <Route
            path="/all-users"
            element={<People />}
          />
          <Route
            path='/saved'
            element={<Saved />}
          />
          <Route
            path="/create-post"
            element={<CreatePost />}
          />
          <Route
            path="/update-post/:id"
            element={<UpdatePost />}
          />
          <Route
            path="/post-detail/:id"
            element={<PostDetail />}
          />
          <Route
            path="/profile/:id"
            element={<Profile />}
          />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
