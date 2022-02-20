using Microsoft.Extensions.Caching.Memory;
using System;

namespace PaladinsDev.PaladinsDotNET
{
    class Cache
    {
        private IMemoryCache cache;

        public Cache()
        {
            cache = new MemoryCache(new MemoryCacheOptions());
        }
        public T Remember<T>(string itemName, int minutesToLive, Func<T> setFunction)
        {
            var cacheItem = (T)cache.Get(itemName);

            if (cacheItem == null)
            {
                cacheItem = setFunction();
                cache.Set(itemName, cacheItem, DateTimeOffset.Now.AddMinutes(minutesToLive));
            }

            return cacheItem;
        }
    }
}