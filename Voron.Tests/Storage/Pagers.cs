﻿using System;
using System.IO;
using Voron.Impl;
using Xunit;

namespace Voron.Tests.Storage
{
    public class Pagers
    {
#if DEBUG
        [Fact]
        public void PureMemoryPagerReleasesPagerState()
        {
            PagerReleasesPagerState(() => new PureMemoryPager());
        }

        [Fact]
        public void MemoryMapPagerReleasesPagerState()
        {
            PagerReleasesPagerState(() => new MemoryMapPager("db.voron"));
            File.Delete("db.voron");
        }


        [Fact]
        public void FilePagerReleasesPagerState()
        {
            PagerReleasesPagerState(() => new FilePager("db.voron", NativeFileAttributes.Normal));
            File.Delete("db.voron");
        }

        private static void PagerReleasesPagerState(Func<AbstractPager> constructor)
        {
            var instanceCount = PagerState.Instances.Count;

            using (constructor()) { }

            Assert.Equal(instanceCount, PagerState.Instances.Count);
        }
#endif
    }
}