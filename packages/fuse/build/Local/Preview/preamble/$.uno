/* I'm a generated file. Please do not edit me. */
using Uno;
using Uno.Collections;
using Uno.UX;
using Uno.IO;
using Outracks.Simulator;
using Outracks.Simulator.Bytecode;
namespace Outracks.Simulator.Runtime
{
public class UxTemplate 
: Template
{
readonly Func<object> _create;public UxTemplate(Func<object> create, string matchCase, bool isDefault)
: base(matchCase, isDefault)
{

							_create = create;
						
}
public override object New()
{

							return _create();
						
}
}
}

#pragma reset

using Uno;
using Uno.Collections;
using Uno.UX;
using Uno.IO;
using Outracks.Simulator;
using Outracks.Simulator.Bytecode;
namespace Outracks.Simulator.Runtime
{
public class UxProperty<T> 
: Property<T>
{

						readonly Action<object, object, object> _setter;
						readonly Func<object, object> _getter;
						readonly Uno.UX.PropertyObject _obj;
						readonly bool _supportsOriginSetter;public UxProperty(Action<object, object, object> setter, Func<object, object> getter, Uno.UX.PropertyObject obj, string name, bool supportsOriginSetter)
: base(new Uno.UX.Selector(name))
{

							_setter = setter;
							_getter = getter;
							_obj = obj;
							_supportsOriginSetter = supportsOriginSetter;
						
}
public override Uno.UX.PropertyObject Object { get { return _obj; } }public override bool SupportsOriginSetter { get { return _supportsOriginSetter; } }public override void Set(Uno.UX.PropertyObject obj, T value, Uno.UX.IPropertyListener origin)
{

							var oldValue = _getter(obj);
							_setter(obj, value, origin);
							
							if (object.ReferenceEquals(value, null) && object.ReferenceEquals(oldValue, null))
								return;	

							if (!object.ReferenceEquals(value, null) && value.Equals(oldValue))
								return;

							Uno.UX.PropertyObject.EmulatePropertyChanged(obj, Name, origin);
						
}
public override T Get(PropertyObject obj)
{

							var res = _getter(obj);							
							return res == null ? (typeof(T) == typeof(string) ? (T)(object)"" : default(T)) : (T)res;
						
}
}
}

#pragma reset

using Uno;
using Uno.Collections;
using Uno.UX;
using Uno.IO;
using Outracks.Simulator;
using Outracks.Simulator.Bytecode;
namespace Outracks.Simulator
{
public class ByteFileSource 
: Uno.UX.FileSource
{
byte[] _bytes;public void Update(byte[] newBytes)
{

									_bytes = newBytes;
									OnDataChanged();
								
}
public ByteFileSource(string path, byte[] bytes)
: base(path)
{
_bytes = bytes;
}
public override Stream OpenRead()
{
return new ArrayStream(_bytes);
}
public override byte[] ReadAllBytes()
{
return _bytes;
}
}
}

#pragma reset

using Uno;
using Uno.Collections;
using Uno.UX;
using Uno.IO;
using Outracks.Simulator;
using Outracks.Simulator.Bytecode;
namespace Outracks.Simulator
{
public class FileCache 
{
static readonly Dictionary<string, Outracks.Simulator.ByteFileSource> _cache = new Dictionary<string, Outracks.Simulator.ByteFileSource>();public static void Update(string path, byte[] bytes)
{

									Outracks.Simulator.ByteFileSource fs = null;
									if (_cache.TryGetValue(path, out fs))
										fs.Update(bytes);
									else
										_cache[path] = new Outracks.Simulator.ByteFileSource(path, bytes);
								
}
public static Outracks.Simulator.ByteFileSource GetFileSource(string path)
{
return _cache[path];
}
}
}

#pragma reset

/* #00000000; /usr/local/Teamcity/Agents/tcagent-osx-agent02-teamcity-dyson/work/b939dc4c6ac331f9/Source/Outracks.Simulator.Compiler/Selection/RuntimeSelection.cs ; */


#pragma reset

/* #00000000; /usr/local/Teamcity/Agents/tcagent-osx-agent02-teamcity-dyson/work/b939dc4c6ac331f9/Source/Outracks.Simulator.Compiler/CodeGeneration/RuntimeTagRegistry.cs ; */


#pragma reset

using Uno;
using Uno.Collections;
using Uno.UX;
using Uno.IO;
using Outracks.Simulator;
using Outracks.Simulator.Bytecode;
namespace Outracks.Simulator.Runtime
{
public class SimulatedObjectTypeRegistry 
{
static readonly WeakDictionary<object, TypeName> SimulatedObjectTypes = new WeakDictionary<object, TypeName>();static readonly Dictionary<TypeName, TypeName> BaseTypes = new Dictionary<TypeName, TypeName>();public static void RegisterSimulatedType(string typeName, string baseTypeName)
{

							BaseTypes.Add(TypeName.Parse(typeName), TypeName.Parse(baseTypeName));
						
}
public static bool IsSimulatedType(object obj, string typeNameString)
{

							var typeToBe = TypeName.Parse(typeNameString);

							TypeName type = null;
							if (!TryGetSimulatedType(obj, out type))
								return false;

							if (type == typeToBe)
								return true;
						
							TypeName baseType = null;
							while (BaseTypes.TryGetValue(type, out baseType))
							{
								if (type == typeToBe)
									return true;

								type = baseType;
							}

							return false;
						
}
public static void RegisterSimulatedObject(object obj, string typeName)
{

							SimulatedObjectTypes[obj] = TypeName.Parse(typeName);
						
}
static bool TryGetSimulatedType(object obj, out TypeName type)
{

							return SimulatedObjectTypes.TryGetValue(obj, out type);
						
}
}
}

#pragma reset

namespace Outracks.Simulator
{
public class GeneratedApplication 
: Outracks.Simulator.Application
{
public GeneratedApplication()
: base(new [] {new Uno.Net.IPEndPoint(Uno.Net.IPAddress.Parse("127.0.0.1"), 12124), new Uno.Net.IPEndPoint(Uno.Net.IPAddress.Parse("192.168.1.66"), 12124), new Uno.Net.IPEndPoint(Uno.Net.IPAddress.Parse("192.168.1.68"), 12124)}, "/Users/Bart/Dev/oss/FuseR/packages/fuse/NewsFeed.unoproj", GetBundle, new string[] { })
{

							if defined(CPLUSPLUS)
								Reflection = new Outracks.Simulator.Reflection.Native.NativeReflection(new Outracks.Simulator.Reflection.Native.SimpleTypeMap());
						
}
static Uno.IO.Bundle GetBundle()
{
return Uno.IO.Bundle.Get("NewsFeed");
}
}
}
