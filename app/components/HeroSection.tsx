export function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-[var(--gray-950)] py-16 px-4 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gray-950)] via-[var(--gray-900)] to-[var(--gray-950)] opacity-50"></div>

      {/* Content container */}
      <div className="relative mx-auto max-w-5xl">
        {/* Main heading with gradient text */}
        <h1 className="mb-6 text-center text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            A2Z DSA Sheet
          </span>
          <span className="block text-[var(--gray-100)]">
            Reimagined & Free
          </span>
        </h1>
        {/* Subheading */}
        <p className="mx-auto mb-8 max-w-3xl text-center text-lg text-[var(--gray-300)] md:text-xl">
          Every problem from A2Z DSA Sheet — now with free, direct links to
          platforms like LeetCode and GeeksforGeeks.
        </p>
        {/* Feature list
        <div className="mx-auto mb-10 max-w-2xl">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg bg-[var(--gray-900)] p-4">
              <CheckCircle className="mt-1 h-5 w-5 text-blue-400" />
              <div>
                <h3 className="font-medium text-[var(--gray-100)]">
                  No More Tab Switching
                </h3>
                <p className="text-sm text-[var(--gray-300)]">
                  Access all problems directly from one place
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-[var(--gray-900)] p-4">
              <CheckCircle className="mt-1 h-5 w-5 text-blue-400" />
              <div>
                <h3 className="font-medium text-[var(--gray-100)]">
                  Free Access
                </h3>
                <p className="text-sm text-[var(--gray-300)]">
                  No paywalls or premium subscriptions needed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-[var(--gray-900)] p-4">
              <CheckCircle className="mt-1 h-5 w-5 text-blue-400" />
              <div>
                <h3 className="font-medium text-[var(--gray-100)]">
                  Structured Learning
                </h3>
                <p className="text-sm text-[var(--gray-300)]">
                  Follow the same powerful problem sequence
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-[var(--gray-900)] p-4">
              <CheckCircle className="mt-1 h-5 w-5 text-blue-400" />
              <div>
                <h3 className="font-medium text-[var(--gray-100)]">
                  Multiple Platforms
                </h3>
                <p className="text-sm text-[var(--gray-300)]">
                  LeetCode, GeeksforGeeks, and more
                </p>
              </div>
            </div>
          </div>
        </div> */}
        {/* CTA button
        <div className="flex justify-center">
          <Link
            href="#problems"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/25"
          >
            Start Solving Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div> */}
      </div>
    </div>
  );
}
