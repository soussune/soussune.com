const desc = (episode) => {
  if (episode.description !== null) return episode.description

  const combinedActors = episode.actorIds.join('と')
  const postActors = episode.actorIds.length > 1 ? `の${episode.actorIds.length}人で` : 'が'

  const topics = episode.topics || []
  const combinedTopics = topics.join('、')
  const postTopics = topics.length > 1 ? 'など' : ''
  const topicsText = topics.length > 0 ? `、${combinedTopics}${postTopics}について` : ''

  return `${combinedActors}${postActors}${topicsText}話しました。`
}

module.exports = { desc }
