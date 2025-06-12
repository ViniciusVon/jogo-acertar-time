import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';
import type { Team } from '../types/Team';

interface TeamContextProps {
  teams: Team[];
  addTeam: (team: Team) => void;
}

const TeamContext = createContext<TeamContextProps>({ teams: [], addTeam: () => {} });

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get<Team[]>('/teams');
      setTeams(response.data);
    };
    fetchData();
  }, []);

  const addTeam = async (team: Team) => {
    const response = await api.post<Team>('/teams', team);
    setTeams((prev) => [...prev, response.data]);
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
