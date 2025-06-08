const StatCard = ({ stat, index }) => {
  const Icon = stat.icon

  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-110 transition-all duration-500 hover:bg-white/20 animate-fade-in-up`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <Icon className="h-8 w-8 text-white mx-auto mb-4 animate-bounce-slow" />
      <div className="text-3xl font-bold text-white mb-2 animate-counter">
        {stat.number}
      </div>
      <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
    </div>
  )
}

export default StatCard
