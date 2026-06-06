export const group = async (client, update) => {
  console.log('📍 حدث:', update);
};

export const access = async (client, message) => {
  const { sender, command } = message;
  const isOwner = client.config.owners.some(o => o.jid === sender);
  if (command.type === 'owner' && !isOwner) {
    return false;
  }
  return true;
};
