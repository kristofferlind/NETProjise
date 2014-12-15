using Projise.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Projise.DomainModel.Events
{
    public class SyncEventArgs<T> where T : IEntity
    {
        public T Item { get; private set; }
        public string Type { get; private set; }
        public string Operation { get; set; }
        public SyncEventArgs(string operation, T item)
        {
            Item = item;
            Type = item.GetType().Name.ToString().ToLower();
            Operation = operation;
        }
    }
}
