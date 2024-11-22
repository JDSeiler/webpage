# Manage Effects Carefully
[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
might be the single greatest piece of documentation released for React. I think every
React developer should read it and re-read it regularly. Now, I don't want to regurgitate
that documentation, just go read the original. But, I do want to highlight one particular
anti-pattern with effects that I see *all the time*, which is using them to compute values
based on props or state:
```tsx
const NeutrinoEngineCarborator = () => {
  const [overdrive, setOverdrive] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("overdrive=1")) {
      setOverdrive(true);
    }
  }, []);

  // blah blah blah
}
```

In this example, we can calculate `overdrive` directly in rendering, removing the effect
and state:
```tsx
const NeutrinoEngineCarborator = () => {
  const overdrive = window.location.search.includes("overdrive=1");

  // blah blah blah
}
```
Or, consider this example. We're writing the dashboard for a spaceship. We're provided
with a list of engine subsystems, and a list of the same subsystems ranked by how in
danger they are of exploding ("peril"). We want to highlight the most in-danger
subsystem in our dashboard. we might write the code something like the following.
If you think my example code isn't realistic, know that it's based off code I have
seen out in the wild, obviously with superficial details changed to protect the innocent.
```tsx
// The types aren't that important
type SubSys = {
  id: string;
  name: string;
  // You can use your imagination for other props
}

type Peril = {
  id: string; // system in peril
  rating: number // higher === more peril
}

const WarpDriveSubsystemManager = () => {
  // All subsystems
  const subsystems: SubSys[] = useSelector(selectSubsystems);
  // List of subsystems that are failing
  const systemsInPeril: Peril[] = useSelector(selectPeril);
  const [
    prioritySys,
    setPrioritySys
  ] = useState<SubSys | null>(null);

  useEffect(() => {
    // You can use your imagination for how
    // findMaxPeril is implemented
    const { id: mostPerilous } = findMaxPeril(systemsInPeril);
    const mostInPeril = subsystems.find(s => s.id === mostPerilous);
    setPrioritySys(mostInPeril);
  }, [subsystems, systemsInPeril]);

  // blah blah blah
}
```
This code has some soundness issues unrelated to effects, like what happens where there
are no systems in peril, but that's not the point. Let's see how we can simplify this
code, warts and all:
```tsx
const getMaxPeril = (subsystems: SubSys[], systemsInPeril: Peril[]): SubSys => {
  const { id: mostPerilous } = findMaxPeril(systemsInPeril);
  const mostInPeril = subsystems.find(s => s.id === mostPerilous);
  return mostInPeril;
};

const WarpDriveSubsystemManager = () => {
  // All subsystems
  const subsystems: SubSys[] = useSelector(selectSubsystems);
  // List of subsystems that are failing
  const systemsInPeril: Peril[] = useSelector(selectPeril);
  const prioritySys = getMaxPeril(subsystems, systemsInPeril);

  // blah blah blah
}
```
Why is using an effect in this way bad? It's because effects run *after* React renders your
components and commits them to the DOM. So, if an effect immediately sets state, it's going
to trigger an entirely new render cycle. Not only is this inefficient, it also results in
code that is unecessarily complex.

In both examples, removing the effect and state makes the code easier to read and understand,
more performant, and shorter.

Some might quibble that performing the computations (`getMaxPeril` and
`window.location.search.includes`) every render could cause performance issues. But, if you find
a component is slow and *run a benchmark* to prove that an in-render computation is the
bottleneck, you should reach for [useMemo](https://react.dev/reference/react/useMemo) and **not**
`useEffect`.
