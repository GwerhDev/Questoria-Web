import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdventureById } from '../store/adventureSlice';


const AdventureDetailPage = () => {
  const { adventureId } = useParams();
  const dispatch = useDispatch();
  const { selectedAdventure: adventure, status, error } = useSelector((state) => state.adventures);

  useEffect(() => {
    if (adventureId) {
      dispatch(fetchAdventureById(adventureId));
    }
  }, [adventureId, dispatch]);

  if (status === 'loading' || !adventure) {
    return <div className="text-text-primary">Cargando aventura...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-text-primary">{adventure.name}</h1>
      <p className="text-lg text-text-secondary mb-6">{adventure.description}</p>

      {adventure.quests && adventure.quests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adventure.quests.map((quest) => (
            <div key={quest._id} className="bg-surface p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-text-primary">{quest.title}</h3>
              <p className="text-text-secondary mt-2">{quest.description}</p>
              {quest.reward && <p className="text-sm text-text-tertiary mt-2">Reward: {quest.reward}</p>}
              {quest.levelRequirement && <p className="text-sm text-text-tertiary">Level: {quest.levelRequirement}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary">No quests found for this adventure.</p>
      )}
    </div>
  );
};

export default AdventureDetailPage;