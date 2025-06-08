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
        className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:animate-bounce`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {benefit.title}
      </h3>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
        {benefit.description}
      </p>
    </div>
  )
}

export default BenefitCard
