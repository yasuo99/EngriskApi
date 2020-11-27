using System.Collections.Generic;

namespace Engrisk.Helper
{
    public static class EnumerableHelper
    {
        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source) where T:class{
            return source;
        }
    }
}