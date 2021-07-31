import { Route, Switch, withRouter } from 'react-router-dom';
import { SignIn, SignUp } from '../pages';
import { DashboardLayout } from '../layouts/dashboard-layout-container'



const MainRouter = () => {


    return(
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/app/dashboard" component={DashboardLayout} />
            <Route exact path="/app/dashboard/home" component={DashboardLayout} />
            <Route exact path="/app/dashboard/cases" component={DashboardLayout} />
            <Route exact path="/app/dashboard/case/thread" component={DashboardLayout} />
            <Route exact path="/app/dashboard/cases/addcase" component={DashboardLayout} />
            <Route exact path="/app/dashboard/users" component={DashboardLayout} />
            <Route exact path="/app/dashboard/settings" component={DashboardLayout} />
            <Route exact path="/app/dashboard/about" component={DashboardLayout} />
            <Route exact path="/app/dashboard/contact" component={DashboardLayout} />

        </Switch>
    )
}

export default withRouter(MainRouter);