export default function StorefrontPage() {
  const { addToCart } = useCartActions();

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [walkthroughActive, setWalkthroughActive] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [viewMode, setViewMode] = useState<"4" | "3" | "2" | "list">("4");
  const [toast, setToast] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Get theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [
      "storefront-products",
      {
        search: debouncedSearch,
        category,
        sortBy,
        tags: activeTags,
      },
    ],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        pageParam: pageParam as number,
        search: debouncedSearch,
        category,
        sortBy,
        tags: activeTags,
      }),
    getNextPageParam: (last) => last.nextPage,
    initialPageParam: 0,
  });

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((p) => p.products) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const handleAddToCart = useCallback(
    (product: Product) => {
      void addToCart({
        id: product.id,
        variantId: product.variantId,
        title: product.title,
        price: Math.round(product.price * 100),
        thumbnail: product.thumbnail,
        quantity: 1,
      });

      setToast(`${product.title} added to cart`);

      setTimeout(() => {
        setToast(null);
      }, 2200);
    },
    [addToCart]
  );

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setActiveTags([]);
    setMaxPrice(250);
    setSortBy("newest");
  };

  const hasFilters =
    search ||
    category !== "all" ||
    activeTags.length > 0 ||
    maxPrice < 250;

  const CATEGORIES = [
    "all",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Accessories",
  ];

  const TAG_OPTIONS = [
    "new",
    "sale",
    "bestseller",
    "limited",
  ];