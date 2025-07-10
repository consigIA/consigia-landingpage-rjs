const BenefitCard = ({ benefit, index, isVisible }) => {
const Icon = benefit.icon

  return (
    <div
      className={`text-center p-6 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 group cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div
        className={`w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:animate-bounce`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">
        {benefit.title}
      </h3>
      <p className="text-cyan-400">
        {benefit.description}
      </p>
    </div>
  )
}

export default BenefitCard
