import { cn } from "@/lib/utils"

const MaxWidthWrapper = ({
    className,
    children
}
) => {
    return(
        <div className={cn(
            'mx-auto w-full max-w-screen-xl px-2.5 md:px-20 bg-blue-gray-300',
            className
            )}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper