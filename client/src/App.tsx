import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import MathEducation from "@/pages/MathEducation";
import Quiz from "@/pages/Quiz";
import Pi from "@/pages/Pi";
import Mathematicians from "@/pages/Mathematicians";
import QuranMath from "@/pages/QuranMath";
import Creators from "@/pages/Creators";
import NotFound from "@/pages/not-found";
import { AppProvider } from "@/context/AppContext";

function App() {
  return (
    <AppProvider>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/math-education" component={MathEducation} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/pi" component={Pi} />
          <Route path="/mathematicians" component={Mathematicians} />
          <Route path="/quran-math" component={QuranMath} />
          <Route path="/creators" component={Creators} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
      <Toaster />
    </AppProvider>
  );
}

export default App;
