import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Loginn from './components/Loginn';
import Dashboard from './components/Voter/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import CreateNewPassword from './components/CreateNewPassword';
import Main1 from './components/Main1';
import Result from './components/Admin/Result';
import Profile from './components/Voter/Profile';
import VotersList from './components/Admin/VotersList';
import Main2 from './components/Main2';
import AddVoting from './components/Admin/AddVoting';
import VoteResult from './components/Voter/VoteResult';
import Openvoting from './components/Admin/Openvoting';
import Open from './components/Admin/Open';
import QRCodePage from './components/Admin/QRCodePage';
import Openvote from './components/Admin/Openvote';
import AdminVotings from './components/Admin/AdminVotings';





function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/"                             element={<Main   child={<Loginn              />} />}>       </Route>
        <Route path="/forgot-password"              element={<Main   child={<ForgotPassword      />} />}>       </Route>
        <Route path="/create-new-password/:token"   element={<Main   child={<CreateNewPassword   />} />}>       </Route>
        <Route path="/signup"                       element={<Main   child={<Signup              />} />}>       </Route> 
        <Route path="/dashboard"                    element={<Main1 child1={<Dashboard           />} />}>       </Route> 
        <Route path="/voter-profile"                element={<Main1 child1={<Profile             />} />}>       </Route>
        <Route path="/vote-result"                  element={<Main1 child1={<VoteResult          />} />}>       </Route>
        <Route path="/result"                       element={<Main2 child2={<Result              />} />}>       </Route>
        <Route path="/voterslist"                   element={<Main2 child2={<VotersList          />} />}>       </Route>
        <Route path="/addvoting"                    element={<Main2 child2={<AddVoting           />} />}>       </Route>
        <Route path="/openvoting"                   element={<Main2 child2={<Openvoting          />} />}>       </Route>
        <Route path="/Create_openvoting"            element={<Main2 child2={<Open                />} />}>       </Route>
        <Route path="/qr-code"                      element={<Main2 child2={<QRCodePage          />} />}>       </Route>
        <Route path="/Open"                         element={<Main2 child2={<Openvote            />} />}>       </Route>
        <Route path="/adminvoting"                  element={<Main2 child2={<AdminVotings        />} />}>       </Route>
      </Routes>
    </div>
  );
}

export default App;
