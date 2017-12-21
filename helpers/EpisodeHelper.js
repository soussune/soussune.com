const desc = (episode) => {
  if (episode.description !== null) return episode.description

  const combinedActors = episode.actorIds.join('と')
  const postActors = episode.actorIds.length > 1 ? `の${episode.actorIds.length}人で` : 'が'

  const combinedTopics = episode.topics.join('、')
  const postTopics = episode.topics.length > 1 ? 'など' : ''

  return `${combinedActors}${postActors}、${combinedTopics}${postTopics}について話しました。`
}

module.exports = { desc }
